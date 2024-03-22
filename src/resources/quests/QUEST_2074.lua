QUEST_2074 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000815',
	character = 'MaDa_RedRobeGirl',
	end_character = 'MaDa_RedRobeGirl',
	start_requirements = {
		min_level = 93,
		max_level = 103,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 261126558,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_HOOKKIMERA', quantity = 40, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000816',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000817',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000818',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000819',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000820',
		},
	}
}
