QUEST_2025 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000276',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 45,
		max_level = 51,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 45000,
		exp = 133864,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_GOLDENFIST', quantity = 35, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000277',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000278',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000279',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000280',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000281',
		},
	}
}
