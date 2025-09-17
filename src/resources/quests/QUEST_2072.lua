QUEST_2072 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000793',
	character = 'MaDa_RedRobeGirl',
	end_character = 'MaDa_RedRobeGirl',
	start_requirements = {
		min_level = 98,
		max_level = 108,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 522229088,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_RNAMOND', quantity = 50, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000794',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000795',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000796',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000797',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000798',
		},
	}
}
