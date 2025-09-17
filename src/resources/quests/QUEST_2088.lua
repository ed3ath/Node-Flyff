QUEST_2088 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000969',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 111,
		max_level = 117,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 1300000,
		exp = 935675914,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_NECKLACE', quantity = 70, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000970',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000971',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000972',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000973',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000974',
		},
	}
}
