QUEST_2026 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000287',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 47,
		max_level = 51,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 47000,
		exp = 223078,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_ORBRIN', quantity = 35, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000288',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000289',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000290',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000291',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000292',
		},
	}
}
