QUEST_TEAR_MOTHER = {
	title = 'IDS_PROPQUEST_INC_001002',
	character = 'MaSa_JeongHwa',
	end_character = 'MaSa_Porgo',
	start_requirements = {
		min_level = 20,
		max_level = 30,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1176,
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001003',
			'IDS_PROPQUEST_INC_001004',
			'IDS_PROPQUEST_INC_001005',
			'IDS_PROPQUEST_INC_001006',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001007',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001008',
		},
		completed = {
			'IDS_PROPQUEST_INC_001009',
			'IDS_PROPQUEST_INC_001010',
			'IDS_PROPQUEST_INC_001011',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001012',
		},
	}
}
