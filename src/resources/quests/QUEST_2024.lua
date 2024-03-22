QUEST_2024 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000265',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 43,
		max_level = 48,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 43000,
		exp = 93788,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_TOMBMARBLE', quantity = 35, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000266',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000267',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000268',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000269',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000270',
		},
	}
}
